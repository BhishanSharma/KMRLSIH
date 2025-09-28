import { Loader2 } from "lucide-react";

const getShortName = (name, maxLength = 20) => {
  if (!name) return "Untitled";
  return name.length > maxLength ? name.slice(0, maxLength - 3) + "..." : name;
};

const StackCard = ({
  config,
  documentStacks,
  currentTopIndices,
  processingStates,
  handleOpenDocument,
  handleGetSummary,
}) => {
  const currentStack = documentStacks[config.key] || [];
  const currentTopIndex = currentTopIndices[config.key];
  const Icon = config.icon;

  return (
    <div
      className="  rounded-2xl
  shadow-lg
  hover:shadow-xl
  border border-white/80
  bg-white/10
  backdrop-blur-xl
  flex flex-col
  transition-shadow
  duration-300"
    >
      {/* Header */}
      <div
        className={`px-5 py-4 rounded-t-2xl bg-gradient-to-r ${config.gradient} text-white`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5" />
            <h3 className="font-semibold text-base">{config.title}</h3>
          </div>
          <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
            {Math.max(0, currentStack.length - currentTopIndex)}
          </span>
        </div>
      </div>

      {/* Body: Scrollable list with fixed height */}
      <div className="p-4 flex-1 overflow-y-auto max-h-80">
        {currentStack.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No documents available
          </div>
        ) : (
          <ul className="space-y-3">
            {currentStack.slice(currentTopIndex).map((document) => {
              const isProcessingView = processingStates[`view_${document.id}`];

              return (
                <li
                  key={document.id}
                  className="border border-gray-200 rounded-xl p-3 flex justify-between items-center hover:bg-gray-50"
                >
                  {/* Document info */}
                  <div>
                    <h4 className="font-semibold" title={document.title}>
                      {getShortName(document.title, 25)}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Priority: {document.priority} | Status:{" "}
                      {document.processed == "Processed"
                        ? "Summary Available"
                        : "Summary Not Available"}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenDocument(document)}
                      className="px-2 py-1 bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 rounded-lg text-xs transition"
                      disabled={isProcessingView}
                    >
                      {isProcessingView ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        "View"
                      )}
                    </button>

                    <button
                      onClick={() => handleGetSummary(document)}
                      className="px-2 py-1 border border-green-200 text-green-700 hover:bg-green-200 hover:text-green-800 rounded-lg text-xs transition"
                      disabled={isProcessingView}
                    >
                      Summary
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StackCard;
