import prisma from "../database/index";

export const getProducts = async (offset: number, limit: number) => {
  const paginationedProducts = await prisma.products.findMany({
    take: limit,
    skip: offset,
    orderBy: { id: "asc" },
  })
  return paginationedProducts;
};

export const countProducts = async () => {
  return prisma.products.count();
}

export const createProduct = async (name: string, price: number) => {
  return prisma.products.create({ data: { name, price } });
};

export const updateProduct = async (id: number, name: string, price: number) => {
  return prisma.products.update({ where: { id }, data: { name, price } });
};

export const deleteProduct = async (id: number) => {
  return prisma.products.delete({ where: { id } });
};
