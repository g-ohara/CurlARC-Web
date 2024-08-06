interface TeamMemberProps {
  name: string
  role: string
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role }) => (
  <li className="flex items-center gap-2">
    <img
      src="/placeholder.svg"
      width={32}
      height={32}
      alt="Team Member"
      className="rounded-full"
      style={{ aspectRatio: '32/32', objectFit: 'cover' }}
    />
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  </li>
)

interface TeamMembersProps {
  members: TeamMemberProps[]
  className?: string
}

export const TeamMembers: React.FC<TeamMembersProps> = ({ members, className }) => (
  <div className={className}>
    <h4 className="mb-4 text-2xl font-medium">Members</h4>
    <ul className="space-y-2 pl-3 text-xl">
      {members.map((member, index) => (
        <TeamMember key={index} {...member} />
      ))}
    </ul>
  </div>
)
