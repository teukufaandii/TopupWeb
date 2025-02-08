import Game from "../models/game.model";

export const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const game = await Game.findOne({ slug });

    res.status(200).json({ game });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
