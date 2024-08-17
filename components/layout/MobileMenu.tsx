import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { HomeIcon, QrCodeIcon, ChartBarIcon, QuestionMarkCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <Image src="/images/logo.png" alt="QRTraffic Logo" width={32} height={32} />
              </div>
              <nav className="mt-5 px-2 space-y-1">
                <MobileMenuLink href="/" icon={HomeIcon} text="Home" />
                <MobileMenuLink href="/qr-codes" icon={QrCodeIcon} text="QR Codes" />
                <MobileMenuLink href="/analytics" icon={ChartBarIcon} text="Analytics" />
                <MobileMenuLink href="/support" icon={QuestionMarkCircleIcon} text="Support" />
                <MobileMenuLink href="/settings" icon={Cog6ToothIcon} text="Settings" />
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
      </Dialog>
    </Transition.Root>
  )
}

interface MobileMenuLinkProps {
  href: string;
  icon: React.ElementType;
  text: string;
}

const MobileMenuLink: React.FC<MobileMenuLinkProps> = ({ href, icon: Icon, text }) => (
  <Link
    href={href}
    className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
  >
    <Icon className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
    {text}
  </Link>
)

export default MobileMenu