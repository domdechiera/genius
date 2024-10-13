import { Button } from "@/components/ui/button"
import Link from "next/link";

const LandingPage = () => {
    return(
        <div>
            Landing Page (Unprotected)
            <div>
                <Link href="sign-in">
                    <Button>
                        Login
                    </Button>
                    <Link href="sign-up">
                    <Button>
                        Register
                    </Button>
                </Link>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;