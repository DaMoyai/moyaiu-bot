const { AudioFilters } = require("discord-player")

AudioFilters.define("3D", "apulsator=hz=0.130")
AudioFilters.define("ultrabass", "bass=g=50")
AudioFilters.define(
	"party",
	"channelsplit,sidechaingate=level_in=44, apulsator=hz=1.4, vibrato = f = 12, aresample=48000,asetrate=48000*1.40 "
)
AudioFilters.define("echo", "aecho=0.8:0.9:1000:0.3")
AudioFilters.define("robot", "aecho=0.8:0.88:6:0.4")
AudioFilters.define("daycore", "aresample=47000,asetrate=47000*0.75")
AudioFilters.define("earrape", "channelsplit,sidechaingate=level_in=45")
AudioFilters.define("vibrato", "vibrato=f=9")
// "aresample=48000,asetrate=48000*1.25",
