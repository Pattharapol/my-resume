export default function Experience() {
  const experiences = [
    {
      title: "Nov 2023 – Present @ Ngern Tid Lor",
      details: [
        "Develop API (Microservice) for internal applications on both mobile and web platforms.",
        "Design relational and non-relational databases for application use.",
        "Refactor legacy code for better readability and maintainability.",
        "Apply 'Keep It Simple, Stupid (KISS)' coding principles.",
        "Coach and review code for colleagues and interns.",
        "Integrate APIs with third parties such as BBL, UOB, KBANK, BAY, in-house systems, 2C2P, and Omise.",
        "Research and develop better approaches to replace outdated methods and functions.",
        "Provide technical solutions to achieve business goals and reduce costs in collaboration with PO, BA, SA, users, and the business team.",
      ],
    },
    {
      title: "Sep 2022 - Oct 2023 @ Backend Developer at Sabuy Technology",
      details: [
        "Improve and optimize existing projects to meet partner requirements across both monolith and microservice architectures.",
        "Design and develop APIs for partners.",
        "Refactor existing projects for better performance and maintainability.",
        "Perform ETL processes from Cassandra (Vending Machine) to PostgreSQL.",
        "Collaborated in designing and developing APIs for Condom Vending Machines.",
        "Integrate APIs with third-party systems such as SAP.",
      ],
    },
    {
      title: "Feb 2021 - Aug 2022 @ Backend Developer at Izpal Corporation",
      details: [
        "Implemented RESTful APIs and GraphQL APIs for healthcare web and mobile applications.",
      ],
    },
    {
      title: "Jan 2016 - Feb 2021 @ Developer at Phorsisuwan Hospital",
      details: [
        "Gather requirements, design, and develop Back Office Management and API-based Windows applications.",
        "Develop HR Reporting and Warehouse Management applications integrated with hospital systems.",
        "Integrate with MOPH API to send and receive data with the national health data center.",
        "Studied Computer Science and graduated in 2022.",
      ],
    },
    {
      title: "2015 - Jan 2016 @ Freelance Programmer",
      details: [
        "Designed and developed both Windows applications and APIs.",
        "Assisted the team in fixing bugs and implementing new projects on Windows applications.",
        "Created a POS system for a café — my first real project.",
        "Learned and practiced coding fundamentals.",
      ],
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-green-900 mb-4">EXPERIENCED</h2>
      <div className="space-y-6 text-sm text-gray-800">
        {experiences.map((exp) => (
          <div key={exp.title}>
            <p className="font-semibold">{exp.title}</p>
            <ul className="list-disc list-inside">
              {exp.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
