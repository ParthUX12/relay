import Screen from '../components/ui/Screen';

// PLACEHOLDER: replace with the Figma "Language" screen.
export default function Language() {
  return (
    <main className="min-h-full bg-grey-10 p-2 md:p-2">
      <section className="relative min-h-[calc(100vh-24px)] overflow-hidden rounded-lg bg-white px-4 pb-0 pt-2 shadow-1">
        <Screen title="Language">
          <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
            {/* Illustration */}
            <img 
              src="/assets/images/underConstruction.svg" 
              alt="Upgrade Plan" 
              className="mb-10 mt-20 h-48 w-auto object-contain"
             />
            <p className="text-body text-grey-65">This page is currently under construction.</p>
          </div>
         </Screen>
      </section>
    </main>
  );
}
