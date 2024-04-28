const Controller = require("../../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");
const {
  addCarGroupSchema,
  updateCarGroupSchema,
} = require("../../../validators/admin/carGroups.schema");
const { CarGroupsSchemaModel } = require("../../../../models/carGroups");

class CarGroupController extends Controller {
  async getListOfCarGroups(req, res) {
    const query = req.query;
    const carGroup = await CarGroupsSchemaModel.find(query);
    if (!carGroup)
      throw createHttpError.ServiceUnavailable("No car group found");

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        carGroup,
      },
    });
  }

  async addNewCarGroup(req, res) {
    const { title, type } = await addCarGroupSchema.validateAsync(req.body);
    await this.findCarGroupWithTitle(title);
    const carGroup = await CarGroupsSchemaModel.create({
      title,
      type,
    });

    if (!carGroup) throw createHttpError.InternalServerError("internal error");
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: {
        message: "Nwe gruop added",
      },
    });
  }

  async findCarGroupWithTitle(title) {
    const carGroup = await CarGroupsSchemaModel.findOne({ title });
    if (carGroup) throw createHttpError.BadRequest("car group exist");
  }

  async checkExistCarGroup(id) {
    const carGroup = await CarGroupsSchemaModel.findById(id);
    if (!carGroup) throw createHttpError.BadRequest("car group is not exist");
    return carGroup;
  }

  async updateCarGroupy(req, res) {
    const { id } = req.params;
    const { title, type } = req.body;
    await this.checkExistCarGroup(id);
    await updateCarGroupSchema.validateAsync(req.body);
    const updateResult = await CarGroupsSchemaModel.updateOne(
      { _id: id },
      {
        $set: { title, type },
      }
    );
    if (updateResult.modifiedCount == 0)
      throw createError.InternalServerError("Update failed");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "Update successful",
      },
    });
  }

  async removeCarGroup(req, res) {
    const { id } = req.params;
    const carGroup = await this.checkExistCarGroup(id);
    const deleteResult = await CarGroupsSchemaModel.deleteMany({
      $or: [{ _id: carGroup._id }, { parentId: carGroup._id }],
    });
    if (deleteResult.deletedCount == 0)
      throw createError.InternalServerError("Failed to delete");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "Deleted successful",
      },
    });
  }

  async getCarGroupById(req, res) {
    const { id } = req.params;
    const carGroup = await this.checkExistCarGroup(id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        carGroup,
      },
    });
  }
}

module.exports = {
  CarGroupController: new CarGroupController(),
};
