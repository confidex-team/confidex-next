import { Wrapper } from "@/components/Wrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-orange-200 relative">
      <Wrapper>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] w-full px-4">
          {/* Hero Section */}
          <div className="text-center w-full max-w-4xl mx-auto space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#F6411B]/20 to-orange-500/20 blur-3xl rounded-full" />
              <h1 className="relative text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#F6411B] to-orange-500 bg-clip-text text-transparent">
                SoloPatty
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              A TEE-based private order book DEX with CoW completely preventing
              front-running & MEV.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/swap"
                className="group flex items-center gap-2 px-8 py-4 backdrop-blur-sm bg-[#F6411B] text-white rounded-xl font-semibold hover:bg-[#F6411B]/90 transition-all hover:shadow-lg hover:shadow-[#F6411B]/20"
              >
                Launch App
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default Home;
