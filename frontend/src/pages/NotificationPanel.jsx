import { useState } from "react";
import {
  Upload,
  Edit,
  Trash2,
  CreditCard,
  Mail,
  MessageCircle,
  Globe,
} from "lucide-react";

export default function NotificationPanel() {
  // Sample notifications (replace with API call later)
  const [notifications] = useState([
    {
      id: 1,
      type: "upload",
      message: "Document 'Report.pdf' uploaded successfully.",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "edit",
      message: "Document 'Invoice.docx' was edited.",
      time: "10 min ago",
    },
    {
      id: 3,
      type: "delete",
      message: "Document 'OldContract.pdf' was deleted.",
      time: "30 min ago",
    },
    {
      id: 4,
      type: "transaction",
      message: "Transaction of $250 completed.",
      time: "1 hr ago",
    },
    {
      id: 5,
      type: "email",
      message: "New file received via Email: 'Specs.xlsx'.",
      time: "2 hr ago",
    },
    {
      id: 6,
      type: "whatsapp",
      message: "File received from WhatsApp: 'Photo.png'.",
      time: "3 hr ago",
    },
    {
      id: 7,
      type: "other",
      message: "Shared file from external link.",
      time: "Yesterday",
    },
  ]);

  // Icons based on type
  const iconMap = {
    upload: <Upload className="text-blue-500 w-5 h-5" />,
    edit: <Edit className="text-yellow-500 w-5 h-5" />,
    delete: <Trash2 className="text-red-500 w-5 h-5" />,
    transaction: <CreditCard className="text-green-500 w-5 h-5" />,
    email: <Mail className="text-indigo-500 w-5 h-5" />,
    whatsapp: <MessageCircle className="text-green-600 w-5 h-5" />,
    other: <Globe className="text-gray-500 w-5 h-5" />,
  };

  return (
    <div className="w-full mx-auto h-full bg-white shadow-md p-6 mt-4">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">No new notifications</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className="flex items-start gap-3 py-5 hover:bg-gray-50 px-2 transition"
            >
              <div>{iconMap[notif.type]}</div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{notif.message}</p>
                <span className="text-xs text-gray-500">{notif.time}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
