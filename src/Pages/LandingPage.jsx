import logo from '../assets/logo.svg';
import { signInWithGoogle } from '../utilities/firebase.js'

const LandingPage = () => {

    return (
        <div className="flex flex-col justify-center items-center gap-y-4 bg-gradient-to-b from-[#DCEFD8] to-[#F1F9EF] h-[100vh]">
            <img src={logo} width={250} height={250} />
            <button className="text-2xl p-4 border-4 border-dark-green rounded-lg cursor-pointer"
                    onClick={() => signInWithGoogle() }> 
                Sign In 
            </button>
        </div>
    )
}

export default LandingPage; 