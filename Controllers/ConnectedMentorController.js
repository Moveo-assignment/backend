ConnectedMentor = require("../Models/ConnectedMentor")
const mongoose = require("mongoose")

const createConnectedMentor = async (req, res) => {
	const state = true
	try {
		const connectedMentor = await ConnectedMentor.create({ isConnected: state })
		res.status(200).json(connectedMentor)
	} catch (error) {}
}

const getCurrentState = async (req, res) => {
	try {
		const state = await ConnectedMentor.find({})
		res.status(200).json(state[0].isConnected)
	} catch (error) {}
}

const setCurrentState = async (req, res) => {
	console.log("I'm here at the backend")
	try {
		console.log(req.body)
		const { isConnected } = req.body // Extract isConnected from req.body
		console.log(isConnected)
		const mentors = await ConnectedMentor.find({})

		mentors[0].isConnected = isConnected

		await mentors[0].save()

		res.status(200).json({ message: "State updated successfully" })
	} catch (error) {
		console.error("Error setCurrentState:", error)
		res.status(500).json({ error: "Internal server error" })
	}
}

module.exports = { createConnectedMentor, getCurrentState, setCurrentState }