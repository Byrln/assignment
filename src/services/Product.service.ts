import prisma from "../database/index";

export const getProducts = async () => {
  return prisma.products.findMany();
};

export const createProduct = async (name: string, price: number) => {
  return prisma.products.create({ data: { name, price } });
};

export const updateProduct = async (id: number, name: string, price: number) => {
  return prisma.products.update({ where: { id }, data: { name, price } });
};

export const deleteProduct = async (id: number) => {
  return prisma.products.delete({ where: { id } });
};
