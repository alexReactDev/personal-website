import AdminLabel from "@/components/AdminLabel";
import AdminNav from "@/components/AdminNav";
import Layout from "@/components/Layout";

function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AdminLabel />
			<Layout>
				<AdminNav />
				<div className="pt-[40px] lg:pt-[32px]">
					{children}
				</div>
			</Layout>
		</>
	)
}

export default AdminLayout;