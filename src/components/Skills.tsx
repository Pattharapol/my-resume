export default function Skills() {
  const skills = [
    "C#",
    ".NET",
    ".NET CORE",
    "Monolith",
    "Microservice",
    "SOAP",
    "Restful API",
    "GraphQL",
    "LINQ",
    "EF CORE",
    "SQL",
    "MySQL",
    "MSSQL",
    "PostgresSQL",
    "MongoDB",
    "Window Application",
    "Go (Basic)",
    "NextJS (Basic)",
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-green-900 mb-2">Skills</h2>
      <ul className="list-none space-y-1 text-sm">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
