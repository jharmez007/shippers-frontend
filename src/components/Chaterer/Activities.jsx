import { PostAuditTable, CharterPartyTable } from "..";

export default function Activities() {
  return (
    <div className="p-6 bg-gray-100 space-y-8 rounded-xl">
      {/* Post Audit Activities */}
      <div>
        <h2 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
          <span className="border-l-4 border-blue-700 pl-2">Post Audit Activities</span>
        </h2>
        <PostAuditTable  />
      </div>

      {/* Charter Party Activities */}
      <div>
        <h2 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
          <span className="border-l-4 border-blue-700 pl-2">Charter Party Activities</span>
        </h2>
        <CharterPartyTable />
      </div>
    </div>
  );
}
