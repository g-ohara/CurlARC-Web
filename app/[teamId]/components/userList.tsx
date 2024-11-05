import { User } from "@/types/model"

interface UserListProps {
  users: User[]
  className?: string
}

export const UserList: React.FC<UserListProps> = ({ users, className }) => (
  <div className={className}>
    <ul className="space-y-2 pl-3 text-xl">
      {users.map((user, index) => (
        <li className="flex items-center gap-2" key={index}>
        <img
          src="/placeholder.svg"
          width={32}
          height={32}
          alt="Team Member"
          className="rounded-full"
          style={{ aspectRatio: '32/32', objectFit: 'cover' }}
        />
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </li>
      ))}
    </ul>
  </div>
)
