"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getUserDetails = async (UserId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { UserId: UserId },
      select: {
        Name: true,
        Email: true,
        Phone: true,
        Gender: true,
        BirthDate: true,
      },
    });
    return { user };
  } catch (error) {
    return { error };
  }
};

export const updateUserDetails = async (
  UserId: string,
  data: {
    Name: string;
    Email: string;
    Phone: string;
    Gender: string;
    BirthDate: string;
  }
) => {
  try {
    const user = await prisma.user.update({
      where: { UserId },
      data: { ...data },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const getUserAddresses = async (UserId: string) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { UserId },
    });
    return { addresses };
  } catch (error) {
    return { error };
  }
};

export const updateUserAddress = async (
  addressId: string,
  data: {
    Country: string;
    City: string;
    Street: string;
    Building: string;
    PostalCode: string;
    Landmark: string;
  }
) => {
  try {
    await prisma.address.update({
      where: { id: addressId },
      data: { ...data },
    });
    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const createNewAddress = async (
  UserId: string,
  data: {
    Country: string;
    City: string;
    Street: string;
    Building: string;
    PostalCode: string;
    Landmark: string;
  }
) => {
  try {
    await prisma.address.create({
      data: { ...data, UserId },
    });
    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
