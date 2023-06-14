import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/cart"],

  async afterAuth(auth, req, evt) {
    if (auth.userId) {
      const exists = await fetch(
        `https://storefront-nadertate-gmailcom.vercel.app/api/user?id=${auth.userId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      // console.log(await exists.json());
      const res = await exists.json();
      if (!res) {
        const body = {
          data: {
            UserId: auth.userId,
            Name: "",
            Email: "",
            Image: "",
            Cart: [],
            WhishList: [],
            Orders: [],
            Address: {},
          },
        };
        await fetch("https://storefront-seven-psi.vercel.app/api/user", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
