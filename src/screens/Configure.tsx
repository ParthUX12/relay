import Screen from '../components/ui/Screen';

// PLACEHOLDER: replace with the Figma "Configure" screen.
export default function Configure() {
  return (
    <Screen title="Configure">
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
  );
}
