import prisma from "./prisma";

export async function getAdmins(sk: number, take: number) {
  try {
    const count = await prisma.admin.count();
    const admins = await prisma.admin.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
      take,
      skip: (sk - 1) * take,
    });
    return { admins, count };
  } catch (error) {
    return { error };
  }
}

export async function createAdmin(name: string, email: string, image: string) {
  try {
    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        image,
      },
    });
    return { admin };
  } catch (error) {
    return { error };
  }
}

export async function getAdminById(id: string) {
  try {
    const admin = await prisma.admin.findUnique({ where: { id } });
    return { admin };
  } catch (error) {
    return { error };
  }
}

export async function updateadmin(
  id: string,
  name: string,
  email: string,
  image: string
) {
  try {
    const admin = await prisma.admin.update({
      where: { id },
      data: {
        name,
        email,
        image,
      },
    });
    return { admin };
  } catch (error) {
    return { error };
  }
}
export async function deleteAdmin(id: string) {
  try {
    const admin = await prisma.admin.delete({
      where: { id },
    });
    return { admin };
  } catch (error) {
    return { error };
  }
}
export async function deleteUser(id: string) {
  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    return { user };
  } catch (error) {
    return { error };
  }
}
