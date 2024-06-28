const Brand = require("../models/brandModel");
const Watch = require("../models/watchesModel");

class BrandController {
  async createBrand(req, res) {
    const { brandName } = req.body;
    try {
      // Check if brandName already exists
      const existingBrand = await Brand.findOne({ brandName });
      if (existingBrand) {
        return res.status(400).json({ message: "Brand name already exists" });
      }
      const brand = new Brand({ brandName });
      await brand.save();
      res.status(201).json({ message: "Brand created successfully", brand });
    } catch (err) {
      res.status(500).json({ message: "Failed to create brand", error: err });
    }
  }

  async getAllBrands(req, res) {
    try {
      const brands = await Brand.find();
      res.status(200).json(brands);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to retrieve brands", error: err });
    }
  }

  async updateBrand(req, res) {
    const { brandId } = req.params;
    const { brandName } = req.body;
    try {
      // Check if brandName already exists
      const existingBrand = await Brand.findOne({ brandName });
      if (existingBrand && existingBrand._id.toString() !== brandId) {
        return res.status(400).json({ message: "Brand name already exists" });
      }
      const updatedBrand = await Brand.findByIdAndUpdate(
        brandId,
        { brandName },
        { new: true }
      );
      if (!updatedBrand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res
        .status(200)
        .json({ message: "Brand updated successfully", updatedBrand });
    } catch (err) {
      res.status(500).json({ message: "Failed to update brand", error: err });
    }
  }

  async deleteBrand(req, res) {
    const { brandId } = req.params;
    try {
      // Check if brand is used by any watches
      const brandInUse = await Watch.findOne({ brand: brandId });
      if (brandInUse) {
        return res
          .status(400)
          .json({ message: "Brand is in use and cannot be deleted" });
      }
      const deletedBrand = await Brand.findByIdAndDelete(brandId);
      if (!deletedBrand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.status(200).json({ message: "Brand deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete brand", error: err });
    }
  }

  async renderEditPage(req, res) {
    const { brandId } = req.params;
    try {
      const brand = await Brand.findById(brandId);
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.status(200).json(brand);
    } catch (err) {
      res.status(500).json({ message: "Failed to load edit page", error: err });
    }
  }

  async renderAddPage(req, res) {
    try {
      res.status(200).json({ message: "Render add page" });
    } catch (err) {
      res.status(500).json({ message: "Failed to load add page", error: err });
    }
  }
}

module.exports = new BrandController();
