interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export default function ExperienceItem({
  title,
  company,
  location,
  period,
  responsibilities,
}: ExperienceItemProps) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="mb-2">
        <h3 className="text-2xl font-averia text-white">{title}</h3>
        <p className="text-lg font-be-vietnam text-gray-300 italic">
          {company} – {location}
        </p>
        <p className="text-sm font-be-vietnam text-gray-400">{period}</p>
      </div>
      <ul className="list-none space-y-2 ml-0">
        {responsibilities.map((item, index) => (
          <li key={index} className="text-base font-be-vietnam text-gray-300 flex">
            <span className="mr-3 text-gray-500">●</span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
