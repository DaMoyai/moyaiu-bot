
process.on("uncaughtException", (err) => {
	console.error("Uncaught error:", err)
})
process.on("ReferenceError", (err) => {
	console.error("Reference Error:", err)
})
process.on("SyntaxError", (err) => {
	console.error("Syntax Error:", err)
})
