const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Member = require("../models/memberModel");

class MemberController {
  async register(req, res) {
    try {
      const { memberName, password, name } = req.body;
      const member = new Member({ memberName, password, name, status: true });
      await member.save();
      res.status(201).json({ message: "Member registered successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async showRegisterPage(req, res) {
    res.status(200).json({ message: "Register page" });
  }

  async showLoginPage(req, res) {
    res.status(200).json({ message: "Login page" });
  }

  async login(req, res) {
    try {
      const { memberName, password } = req.body;
      const member = await Member.findOne({ memberName });
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }

      if (!member.status) {
        return res.status(403).json({ message: "Member account is inactive" });
      }

      const isMatch = await bcrypt.compare(password, member.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { memberId: member._id, isAdmin: member.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      res.header("Access-Control-Allow-Origin", "http://localhost:5173");
      res.header("Access-Control-Allow-Credentials", "true");

      res.status(200).json({
        message: "Login successful",
        token,
        isAdmin: member.isAdmin,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async showProfilePage(req, res) {
    try {
      const member = req.user;
      res.status(200).json({ member });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  }

  async update(req, res) {
    const { memberId } = req.params;
    const { newName } = req.body;
    try {
      const updatedMember = await Member.findByIdAndUpdate(
        memberId,
        { name: newName },
        { new: true }
      );
      if (!updatedMember) {
        return res.status(404).json({ message: "Member not found" });
      }
      res
        .status(200)
        .json({ message: "Profile updated successfully", updatedMember });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async changePassword(req, res) {
    const { memberId } = req.params;
    const { currentPassword, newPassword } = req.body;
    try {
      const member = await Member.findById(memberId);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }

      const isMatch = await bcrypt.compare(currentPassword, member.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid current password" });
      }

      const isSamePassword = await bcrypt.compare(newPassword, member.password);
      if (isSamePassword) {
        return res.status(400).json({
          message: "New password cannot be the same as the current password",
        });
      }

      member.password = newPassword; // Mongoose pre-save hook will hash the new password
      await member.save();
      res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllMembers(req, res) {
    try {
      const members = await Member.find();
      res.status(200).json({ members });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async showEditProfilePage(req, res) {
    try {
      const { memberId } = req.params;
      const member = await Member.findById(memberId);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.status(200).json({ member });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async showChangePasswordPage(req, res) {
    try {
      const { memberId } = req.params;
      const member = await Member.findById(memberId);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.status(200).json({ member });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteMember(req, res) {
    const { memberId } = req.params;
    try {
      const memberToDelete = await Member.findById(memberId);
      if (!memberToDelete) {
        return res.status(404).json({ message: "Member not found" });
      }

      if (memberToDelete.isAdmin) {
        return res.status(403).json({ message: "Cannot delete admin user" });
      }

      memberToDelete.status = false;
      await memberToDelete.save();
      res.status(200).json({ message: "Member deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getMemberById(req, res) {
    const { memberId } = req.params;
    try {
      const member = await Member.findById(memberId);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.status(200).json({ member });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new MemberController();
