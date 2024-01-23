import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/store/auth";

const Navbar = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    return (
        <nav className="flex items-end justify-end px-5 space-x-5 py-2">
            {isLoggedIn ? (
                <>
                    <Link to="/logout">
                        <Button>Logout</Button>
                    </Link>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="mt-3">
                                Share
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Share link</DialogTitle>
                                <DialogDescription>
                                    Anyone who has this link will be able to
                                    view this.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                        Link
                                    </Label>
                                    <Input
                                        id="link"
                                        defaultValue={`http://localhost:5173${location.pathname}`}
                                        readOnly
                                    />
                                </div>
                                <CopyToClipboard
                                    text={`http://localhost:5173${location.pathname}`}
                                >
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className="px-3"
                                    >
                                        <span className="sr-only">Copy</span>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </CopyToClipboard>
                            </div>
                        </DialogContent>
                    </Dialog>
                </>
            ) : (
                <>
                    <Link to="/register">
                        <Button>Register</Button>
                    </Link>
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
