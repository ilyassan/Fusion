export default function Layout({
    children,
    admin,
    manager,
    employee,
  }: {
    children: React.ReactNode
    manager: React.ReactNode
    admin: React.ReactNode
    employee: React.ReactNode
  }) {

    const roles = ["admin", "manager", "employee"];
    const role = roles[1];

    return (
      <>
        {children}
        {role == "admin"
            ?
            admin
            :
            role == "manager"
            ?
            manager
            :
            role == "employee"
            ?
            employee
            :
            null
        }
      </>
    )
  }