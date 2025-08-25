import BenefitCardGrid from "./BenefitCardGrid";

export default function WhyBecomeAmbassador() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent to-red-950/10">
      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Why Become a{" "}
              <span className="text-red-400">Campus Ambassador?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Because being ordinary is overrated! Here's what makes our
              ambassadors absolutely legendary:
            </p>
          </div>

          <BenefitCardGrid />
        </div>
      </div>
    </section>
  );
}
