const Watch = require("../models/watchesModel");
const Brand = require("../models/brandModel");
const mongoose = require("mongoose");

class WatchController {
  async getAllWatches(req, res) {
    try {
      const watches = await Watch.find().populate("brand", "brandName");
      res.status(200).json(watches);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to retrieve watches", error: err });
    }
  }

  async getWatchById(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid watch ID" });
    }
    try {
      const watch = await Watch.findById(id).populate("brand", "brandName");

      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }

      const userComment = req.user
        ? watch.comments.find((comment) => comment.author.equals(req.user._id))
        : null;

      res.status(200).json({ watch, userComment, message: req.query.message });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to retrieve watch details", error: err });
    }
  }

  async submitComment(req, res) {
    const { id } = req.params;
    const { rating, content } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Admins are not allowed to comment" });
    }

    try {
      const watch = await Watch.findById(id);
      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }

      const existingComment = watch.comments.find((comment) =>
        comment.author.equals(req.user._id)
      );
      if (existingComment) {
        return res.status(400).json({ message: "Already commented" });
      }

      const newComment = {
        rating,
        content,
        author: req.user._id,
      };

      watch.comments.push(newComment);
      await watch.save();

      res.status(201).json({
        message: "Comment submitted successfully",
        comment: newComment,
      });
    } catch (err) {
      console.error("Error submitting comment:", err);
      res
        .status(500)
        .json({ message: "Failed to submit comment", error: err.message });
    }
  }

  async searchWatchByName(req, res) {
    const { name, brand } = req.query;
    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Invalid search query",
        error: { message: "Name parameter is missing or empty" },
      });
    }

    try {
      let query = { watchName: { $regex: name, $options: "i" } };

      if (brand && mongoose.Types.ObjectId.isValid(brand)) {
        query.brand = brand;
      }

      const watches = await Watch.find(query).populate("brand", "brandName");
      const brands = await Brand.find().select("brandName");

      if (watches.length === 0) {
        return res.status(404).json({ message: "No watches found." });
      }

      res.status(200).json({ watches, brands });
    } catch (err) {
      res.status(500).json({ message: "Failed to search watches", error: err });
    }
  }

  async filterWatchesByBrand(req, res) {
    const { brandId } = req.params;
    try {
      const watches = await Watch.find({ brand: brandId }).populate(
        "brand",
        "brandName"
      );
      res.status(200).json(watches);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to filter watches by brand", error: err });
    }
  }

  async createWatchForm(req, res) {
    try {
      const brands = await Brand.find().select("brandName");
      res.status(200).json({ brands });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to render watch form", error: err });
    }
  }

  async createWatch(req, res) {
    const { watchName, image, price, brand, watchDescription, Automatic } =
      req.body;
    if (price <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }
    try {
      const newWatch = new Watch({
        watchName,
        image,
        price,
        brand,
        watchDescription,
        Automatic,
      });
      await newWatch.save();
      res.status(201).json({ message: "Watch created successfully", newWatch });
    } catch (err) {
      res.status(500).json({ message: "Failed to create watch", error: err });
    }
  }

  async updateWatch(req, res) {
    const { id } = req.params;
    const { watchName, image, price, watchDescription, Automatic, brand } =
      req.body;
    if (price <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }
    try {
      const updatedWatch = await Watch.findByIdAndUpdate(
        id,
        {
          watchName,
          image,
          price,
          watchDescription,
          Automatic,
          brand,
        },
        { new: true }
      ).populate("brand", "brandName");

      if (!updatedWatch) {
        throw new Error("Watch not found");
      }

      res
        .status(200)
        .json({ message: "Watch updated successfully", updatedWatch });
    } catch (err) {
      res.status(500).json({ message: "Failed to update watch", error: err });
    }
  }

  async deleteWatch(req, res) {
    const { id } = req.params;
    try {
      const deletedWatch = await Watch.findByIdAndDelete(id);
      if (!deletedWatch) {
        return res.status(404).json({ message: "Watch not found" });
      }
      res.status(200).json({ message: "Watch deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete watch", error: err });
    }
  }

  async renderEditPage(req, res) {
    const { id } = req.params;
    try {
      const watch = await Watch.findById(id);
      const brands = await Brand.find().select("brandName");
      if (!watch) {
        return res.status(404).json({ message: "Watch not found" });
      }
      res.status(200).json({ watch, brands });
    } catch (err) {
      res.status(500).json({ message: "Failed to load edit page", error: err });
    }
  }
}

module.exports = new WatchController();
