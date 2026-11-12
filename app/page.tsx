import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Identity from "@/components/kyc/identity"
import Address from "@/components/kyc/address"
import Funds from "@/components/kyc/funds"
import Suitability from "@/components/kyc/suitability"
import Approval from "@/components/kyc/approval"

/**
 * Know your candidate: the home page is a KYC file on James, in five checks.
 * Identity, proof of address, source of funds, suitability, approval. The
 * navbar doubles as the progress through them.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <Identity />
        <Address />
        <Funds />
        <Suitability />
        <Approval />
      </main>
      <Footer />
    </>
  )
}
