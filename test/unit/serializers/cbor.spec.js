const CborSerializer = require("../../../src/serializers/cbor");
const { cloneDeep } = require("lodash");
const P = require("../../../src/packets");

describe("Test CborSerializer constructor", () => {
	it("should create an empty options", () => {
		let serializer = new CborSerializer();
		expect(serializer).toBeDefined();
		expect(serializer.serialize).toBeDefined();
		expect(serializer.deserialize).toBeDefined();
	});
});


describe("Test CborSerializer", () => {

	let serializer = new CborSerializer();
	serializer.init();

	it("should serialize the event packet", () => {
		const now = new Date();
		const obj = {
			ver:"4",
			sender: "node-100",
			id: "8b3c7371-7f0a-4aa2-b734-70ede29e1bbb",
			event: "user.created",
			data: {
				a: 5,
				b: "Test",
				c: now
			},
			broadcast: true,
			meta: {},
			level: 1,
			needAck: false
		};
		const s = serializer.serialize(cloneDeep(obj), P.PACKET_EVENT);
		expect(s.length).toBe(150);

		const res = serializer.deserialize(s, P.PACKET_EVENT);
		expect(res).not.toBe(obj);
		expect(res).toEqual(obj);

	});

});
