import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-off border-t border-border py-16 mt-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Image
              src="/abra-negro.png"
              alt="A:BRA Logo"
              width={100}
              height={32}
              className="h-8 w-auto opacity-90"
            />
          </div>
          <p className="text-center md:text-right text-sm text-text-muted font-light">
            © {new Date().getFullYear()} A:BRA - Strategic Digital Engineering
          </p>
        </div>
      </div>
    </footer>
  );
}

