import Marquee from "react-fast-marquee";


export const messages = [
  "🚀 Build your startup team faster with StartupForge",
  "👥 Connect with talented founders and collaborators",
  "💡 Find the right people for your startup idea",
  "🤝 Collaboration made simple for startups",
  "🔒 Trusted and secure startup networking platform",
  "⚡ Speed up your startup journey today",
  "🌍 Join a growing global startup community",
  "📊 1000+ active users and growing daily",
  "🚀 350+ startup projects created successfully",
  "🎯 Turn your idea into a real startup team"
];

export default function LiveMessage() {
  return (
    <div className="bg-linear-to-l from-orange-200 via-orange-100 to-orange-50">
      {/* Wrapper */}
      <div className="container mx-auto py-2 flex flex-col gap-2">
      <h1 className="text-center font-extrabold text-xl text-red-500">IMPORTENT MESSAGE</h1>
      <Marquee className="py-2 rounded-xs font-semibold text-red-500 uppercase"
      pauseOnHover={true}>
        {
          messages.map((message, index) => <p key={index} className="ml-5">{message}</p>)
        }
      </Marquee>
    </div>
    </div>
  );
}