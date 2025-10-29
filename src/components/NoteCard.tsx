interface NoteCardProps {
  title: string;
  content: string;
  date: string;
  url: string;
  imageUrl?: string;
  language?: string;
}

export default function NoteCard({
  title,
  content,
  date,
  url,
  imageUrl,
  language,
}: NoteCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 snap-start w-[82vw] max-w-[350px] sm:w-96 bg-gray-800 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] hover:bg-gray-750 cursor-pointer block group"
    >
      <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <svg
            className="w-16 h-16 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        )}

        {language && (
          <div className="absolute top-2 right-2 px-2.5 py-1 bg-cyan-800/50 backdrop-blur-sm rounded-full z-20">
            <span className="text-white font-be-vietnam text-xs font-medium">
              {language}
            </span>
          </div>
        )}

        <div className="absolute bottom-2 right-2 z-20">
          <svg
            className="w-5 h-5 text-gray-400 opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center z-10">
          <span className="text-white font-be-vietnam text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            Open in Medium →
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2">
          <h3 className="text-lg font-averia text-white mb-1 line-clamp-2">
            {title}
          </h3>
          <span className="text-xs font-be-vietnam text-gray-400">{date}</span>
        </div>
        <p className="text-sm font-be-vietnam text-gray-300 line-clamp-3">
          {content}
        </p>
      </div>
    </a>
  );
}
