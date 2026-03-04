export async function getJobPosts() {
  // Mock job posts for now; replace with Firestore query later.
  const jobs = [
    {
      id: "job1",
      title: "UI/UX Designer",
      companyName: "Inclusive Design Co.",
      locationText: "Remote",
      badgeText: "Remote Friendly",
      workSetup: "remote",
      targetRoles: ["PWD", "Student/Youth"],
      isActive: true,
    },
    {
      id: "job2",
      title: "Accessibility Tester",
      companyName: "AccessAble Labs",
      locationText: "Quezon City, PH",
      badgeText: "Accessibility Focused",
      workSetup: "onsite",
      targetRoles: ["PWD"],
      isActive: true,
    },
    {
      id: "job3",
      title: "Junior Frontend Developer",
      companyName: "TechLaunch",
      locationText: "Makati, PH",
      badgeText: "Entry Level",
      workSetup: "hybrid",
      targetRoles: ["Student/Youth"],
      isActive: true,
    },
    {
      id: "job4",
      title: "Intern – Marketing Assistant",
      companyName: "BrightFuture Media",
      locationText: "Remote",
      badgeText: "Internship",
      workSetup: "remote",
      targetRoles: ["Student/Youth"],
      isActive: true,
    },
    {
      id: "job5",
      title: "Community Liaison",
      companyName: "Golden Years Foundation",
      locationText: "Cebu City, PH",
      badgeText: "Senior Friendly",
      workSetup: "onsite",
      targetRoles: ["Senior Citizen"],
      isActive: true,
    },
    {
      id: "job6",
      title: "Part-time Consultant",
      companyName: "Experience Matters Inc.",
      locationText: "Hybrid – Manila, PH",
      badgeText: "Flexible Hours",
      workSetup: "hybrid",
      targetRoles: ["Senior Citizen"],
      isActive: true,
    },
  ];

  return jobs;
}

export default {
  getJobPosts,
};

