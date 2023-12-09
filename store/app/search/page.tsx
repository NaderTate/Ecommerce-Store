import Main from "./Main";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { s: string };
}) {
  try {
    return {
      title: "search results for " + searchParams.s || "Nader Express",
      description: "Nader Express",
      twitter: {
        card: "summary_large_image",
        site: "@naderexpress",
        title: "search results for " + searchParams.s || "Nader Express",
        description: "Nader Express",
        images: [
          {
            url: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687293658/Nader%20Express/Frame_1_utki4s.svg",
            width: 800,
            height: 600,
          },
        ],
      },
      openGraph: {
        title: "search results for " + searchParams.s || "Nader Express",
        images: [
          {
            url: "https://res.cloudinary.com/dqkyatgoy/image/upload/v1687293658/Nader%20Express/Frame_1_utki4s.svg",
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Not found",
      description: "This page does not exist",
    };
  }
}
type Props = { searchParams: { s: string } };
function search({ searchParams }: Props) {
  const search = searchParams.s;

  return <Main searchQuery={search} />;
}

export default search;
