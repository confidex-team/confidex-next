import { Wrapper } from "@/components/Wrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MatrixBackground from "@/components/matrix-background";

const Home = () => {
  return (
    <main className="min-h-screen relative">
      <MatrixBackground hover={true} />
      <Wrapper>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] w-full px-4">
          {/* Hero Section */}
          <div className="text-center w-full max-w-4xl mx-auto space-y-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full" />
              <h1 className="relative text-6xl md:text-7xl font-bold bg-gradient-to-tr from-blue-500 to-blue-900 bg-clip-text text-transparent">
                Confidex
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto leading-relaxed">
              A TEE-based private order book DEX with CoW completely preventing
              front-running & MEV.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/swap"
                className="group flex items-center gap-2 px-8 py-4 backdrop-blur-sm bg-blue-700 text-white rounded-none font-semibold hover:bg-blue-600/90 transition-all hover:shadow-lg hover:shadow-blue-600/20"
              >
                Launch App
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl mx-auto px-4">
            <div className="bg-black/10 backdrop-blur-sm p-6 rounded-none border border-blue-600/20 hover:border-blue-600/40 transition-colors">
              <div className="w-12 h-12 bg-blue-600/10 rounded-none flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Secure Trading
              </h3>
              <p className="text-gray-600">
                Protected by TEE technology ensuring your trades are secure and
                private.
              </p>
            </div>

            <div className="bg-black/10 backdrop-blur-sm p-6 rounded-none border border-blue-600/20 hover:border-blue-600/40 transition-colors">
              <div className="w-12 h-12 bg-blue-600/10 rounded-none flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                No Front-Running
              </h3>
              <p className="text-gray-600">
                CoW protocol ensures your trades are executed at the best
                possible price.
              </p>
            </div>

            <div className="bg-black/10 backdrop-blur-sm p-6 rounded-none border border-blue-600/20 hover:border-blue-600/40 transition-colors">
              <div className="w-12 h-12 bg-blue-600/10 rounded-none flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Fair Pricing
              </h3>
              <p className="text-gray-600">
                Transparent and fair pricing mechanism for all traders.
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default Home;