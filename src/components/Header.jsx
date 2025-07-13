import { Film, Heart, Github } from "lucide-react";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white shadow-2xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Film className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Marvel Movies</h1>
              <p className="text-red-100 text-lg">
                Explore the Marvel Cinematic Universe
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all duration-200">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
