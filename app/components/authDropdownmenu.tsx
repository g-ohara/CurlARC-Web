import { Button } from "@/components/ui/button";
import { LogInIcon, LogOutIcon, SettingsIcon, UserIcon } from "@/components/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | undefined,
  handleLogin: () => void;
  handleLogout: () => void;
  goToProfile: () => void;
}

export default function AuthDropdownMenu({ user, handleLogin, handleLogout, goToProfile }: Props) {
return (
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
      {user ? (
        <img
          src={user.image ? user.image : './placeholder.svg'}
          width={32}
          height={32}
          alt="User Avatar"
          className="rounded-full"
          style={{ aspectRatio: '32/32', objectFit: 'cover' }}
        />
      ) : (
        <UserIcon className="h-6 w-6" />
      )}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    {user ? (
      <>
        <DropdownMenuLabel>Logged in as {user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={goToProfile}>
          <UserIcon className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </>
    ) : (
      <>
        <DropdownMenuItem onClick={handleLogin}>
          <LogInIcon className="mr-2 h-4 w-4" />
          Login
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => setIsRegisterModalOpen(true)}>
          <UserIcon className="mr-2 h-4 w-4" />
          Register
        </DropdownMenuItem> */}
      </>
    )}
  </DropdownMenuContent>
</DropdownMenu>
)
}