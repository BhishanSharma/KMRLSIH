export const getShortName = (name, maxLength = 20) => {
  if (!name) return "Untitled";
  return name.length > maxLength ? name.slice(0, maxLength - 3) + "..." : name;
};

export const categorizeDocuments = (documents) => {
  const stacks = {
    stack1: [], // all
    stack2: [], // Viewed - Unread
    stack3: [], // High Priority
    stack4: [], // Normal Priority
    stack5: [], // Low/Medium Priority
    stack6: [], // Urgent/Critical
  };

  documents.forEach((doc) => {
    const normalizedDoc = {
      id: doc.id || doc.doc_id,
      title: doc.title || "Untitled Document",
      cloudinaryUrl: doc.url,
      url: doc.url ,
      priority: doc.priority || "normal",
      viewed: doc.viewed || false,
    };

    stacks.stack1.push(normalizedDoc); // All documents

    if (normalizedDoc.viewed && !normalizedDoc.marked_as_read) {
      stacks.stack2.push(normalizedDoc);
    }

    // Correctly map priority to stacks
    switch (normalizedDoc.priority.toLowerCase()) {
      case "high":
        stacks.stack3.push(normalizedDoc);
        break;
      case "normal":
        stacks.stack4.push(normalizedDoc);
        break;
      case "low":
      case "medium":
        stacks.stack5.push(normalizedDoc);
        break;
      case "urgent":
      case "critical":
        stacks.stack6.push(normalizedDoc);
        break;
      default:
        stacks.stack4.push(normalizedDoc); // fallback to normal
    }
  });

  return stacks;
};

export const stackConfigs = [
  {
    key: "stack3",
    title: "High Priority",
    icon: "AlertCircle",
    gradient: "from-red-500 to-red-700",
  },
  {
    key: "stack4",
    title: "Medium Priority", 
    icon: "Clock",
    gradient: "from-yellow-400 to-yellow-600",
  },
  {
    key: "stack5",
    title: "Low Priority",
    icon: "FileText",
    gradient: "from-green-400 to-green-600",
  },
  {
    key: "stack2",
    title: "Viewed - Unread",
    icon: "Layers",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    key: "stack1",
    title: "All Documents",
    icon: "CheckCircle",
    gradient: "from-neutral-400 to-neutral-600",
  },
];