import os
import aiohttp
import cloudinary.uploader
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from api.app.config import supabase
from api.app.schemas.models import URLRequest, SUMMARYRequest, ListDocsRequest, compliancesRequest, searchRequest
from nlpPipelne.ProcessPipeline import process_file
from nlpPipelne.stages.EmbedIndex import search
import json
from fastapi import Request

router = APIRouter()

UPLOAD_DIR = "./temp"

@router.post("/url")
async def receive_url(request: URLRequest):
    file_url = request.url
    filename = file_url.split("/")[-1]
    file_location = os.path.join(UPLOAD_DIR, filename)

    async with aiohttp.ClientSession() as session:
        async with session.get(file_url) as resp:
            if resp.status != 200:
                raise HTTPException(status_code=400, detail="Download failed")
            content = await resp.read()
            with open(file_location, "wb") as f:
                f.write(content)

    output = process_file(file_location)
    upload_result = cloudinary.uploader.upload(content, resource_type="auto")

    dept_resp = supabase.table("departments").select("dept_id").eq("name", request.dept_name).execute()
    if not dept_resp.data:
        raise HTTPException(status_code=400, detail="Department not found")
    dept_id = dept_resp.data[0]["dept_id"]

    doc_resp = supabase.table("documents").insert({
        "title": filename,
        "department": dept_id,
        "url": upload_result.get("secure_url"),
        "medium": "url",
        "priority": request.priority,
    }).execute()
    inserted_doc = doc_resp.data[0] if doc_resp.data else None

    if inserted_doc:
        doc_id = inserted_doc["doc_id"]
        supabase.table("summaries").insert({
            "doc_id": doc_id,
            "content": output["doc_summary"]
        }).execute()
        supabase.table("transexions").insert({
            "from_user": request.user_id,
            "to_department": dept_id,
            "doc_id": doc_id
        }).execute()

    os.remove(file_location)
    return {
        "document": doc_resp.data,
        "filename": filename,
        "processed": output,
        "cloudinary_url": upload_result.get("secure_url")
    }

@router.post("/file")
async def receive_file(
    file: UploadFile = File(...),
    user_id: str = Form(...),
    dept_name: str = Form(...),
    priority: str = Form(...)
):
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    content = await file.read()
    with open(file_location, "wb") as f:
        f.write(content)

    try:
        output = process_file(file_location)

        dept_resp = supabase.table("departments").select("dept_id").eq("name", dept_name).execute()
        if not dept_resp.data:
            raise HTTPException(status_code=400, detail="Department not found")
        dept_id = dept_resp.data[0]["dept_id"]

        upload_result = cloudinary.uploader.upload(content, resource_type="auto")

        doc_resp = supabase.table("documents").insert({
            "title": file.filename,
            "department": dept_id,
            "url": upload_result.get("secure_url"),
            "medium": "direct file",
            "priority": priority,
        }).execute()
        inserted_doc = doc_resp.data[0] if doc_resp.data else None

        if inserted_doc:
            doc_id = inserted_doc["doc_id"]
            supabase.table("summaries").insert({
                "doc_id": doc_id,
                "content": output.get("doc_summary", "")
            }).execute()
            supabase.table("transexions").insert({
                "from_user": user_id,
                "to_department": dept_id,
                "doc_id": doc_id
            }).execute()

    finally:
        os.remove(file_location)

    return {
        "document": doc_resp.data,
        "filename": file.filename,
        "processed": output,
        "cloudinary_url": upload_result.get("secure_url")
    }

@router.get("/summary")
async def summary(request: SUMMARYRequest):
    response = supabase.table("summaries").select("content") \
        .eq("doc_id", request.doc_id).execute()
    if response.data:
        return {"summary": response.data[0]["content"]}
    return {"error": "No summary found"}

@router.get("/listdocs")
async def listdocs(request: Request, user_id: str):
    redis_conn = request.app.state.redis
    cache_key = f"user_docs:{user_id}"

    # Check if cached
    cached_data = await redis_conn.get(cache_key)
    if cached_data:
        return {"data": json.loads(cached_data), "cached": True}

    # Fetch department ID
    dept_resp = supabase.table("users").select("department").eq("id", user_id).execute()
    if not dept_resp.data:
        raise HTTPException(status_code=404, detail="User not found")

    dept_id = dept_resp.data[0]["department"]

    # Fetch documents
    response = supabase.table("documents").select("*").eq("department", dept_id).execute()
    if not response.data:
        return {"error": "No docs found"}

    # Cache result for 60 seconds
    await redis_conn.set(cache_key, json.dumps(response.data), ex=60)

    return {"data": response.data, "cached": False}

@router.get("/compliances")
async def compliances(request: compliancesRequest):
    response = supabase.table("compliances").select("*").eq("doc_id", request.doc_id).execute()
    if response.data:
        return {"data": response.data}
    return {"error": "No compliances found"}

@router.get("/search")
async def search_docs(request: searchRequest):
    results = search(request.query)
    return {"results": results}