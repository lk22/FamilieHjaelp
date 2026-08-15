import LanguageSwitcher from "../LanguageSwitcher";

export default function MobileNavigationFooter() {
  return (
    <div className="mobile-nav-footer absolute bottom-0 left-0 w-full p-4 border-t border-gray-700 text-center">
      <div className="mobile-nav-lang-swither mb-4">
        <LanguageSwitcher showInMobile={true} />
      </div>
      <div className="flex mb-8">
        <div className="email">
          <a href="mailto:info@familiehjaelp.dk" className="text-white hover:text-gray-400 text-lg">E-mail: <span className="font-bold">info@familiehjaelp.dk</span></a>
        </div>
      </div>
      <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} FamilieHjaelp. All rights reserved.</p>
    </div>
  )
}