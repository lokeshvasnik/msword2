import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Navbar = () => {
    const url = window.location.href;

    return (
        <nav className="flex items-end justify-end px-5">
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
                            Anyone who has this link will be able to view this.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input id="link" defaultValue={url} readOnly />
                        </div>
                        <CopyToClipboard text={url}>
                            <Button type="submit" size="sm" className="px-3">
                                <span className="sr-only">Copy</span>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </CopyToClipboard>
                    </div>
                </DialogContent>
            </Dialog>
        </nav>
    );
};

export default Navbar;
