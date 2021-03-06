const { Op } = require('sequelize');
const { Customer } = require('../../models');

const customerDatasValidations = require('../validations/custermerDatasValidations');
const customerNotFound = require('../validations/customerNotFound');

const createCustomer = async (customerDatas) => {
  try {
    const validatingDatas = customerDatasValidations(customerDatas);

    if (validatingDatas !== true) return validatingDatas;

    const creatingCustomer = await Customer.create(customerDatas);

    return creatingCustomer;
  } catch (error) {
    console.log(`Erro no Service || ${error}`);
  }
};

const getAllCustomers = async () => {
  try {
    const getingCustomers = await Customer.findAll();

    return getingCustomers;
  } catch (error) {
    console.log(`Erro no Service || ${error}`);
  }
};

const getCustomerByName = async (nome) => {
  const search = `%${nome}%`;

  try {
    const getingCustomer = await Customer.findAll({ where: {
      nome: {
        [Op.like]: search,
      },
    } });

    const validatingSearch = customerNotFound(getingCustomer);

    if (validatingSearch !== true) return validatingSearch;

    return getingCustomer;
  } catch (error) {
    console.log(`Erro no Service || ${error}`);
  }
};

const updateCustomer = async (id, customerDatas) => {
  try {
    const validatingDatas = customerDatasValidations(customerDatas);

    if (validatingDatas !== true) return validatingDatas;

    const [customer] = await Customer.update(
      { ...customerDatas },
      { where: { id } },
    );

    const validatingSearch = customerNotFound(customer);

    if (validatingSearch !== true) return validatingSearch;

    return true;
  } catch (error) {
    console.log(`Erro no Service || ${error}`);
  }
};

const softDeleteCustomer = async (id, ativo) => {
  try {
    const deletingCustomer = await Customer.update(
      { ativo },
      { where: { id } },
    );

    console.log(deletingCustomer);

    const validatingSearch = customerNotFound(deletingCustomer);

    if (validatingSearch !== true) return validatingSearch;

    return true;
  } catch (error) {
    console.log(`Erro no Service || ${error}`);
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerByName,
  updateCustomer,
  softDeleteCustomer,
};
