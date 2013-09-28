// Example method taken O'reilly JavaScript: the definitive guide 

// This function creates a new enumerated type. The argument object specifies
// the names and values of each instance of the class. The return value
// is a constructor function that identifies the new class. Note, however
// that the constructor throws an exception: you can't use it to create new
// instances of the type. The returned constructor has properties that
// map the name of a value to the value itself, and also a values array,
// a foreach() iterator function
function enumeration(namesToValues) {
	// This is the dummy constructor function that will be the return value.
	var enumeration = function() { throw "Can't Instantiate Enumerations"; };
	// Enumerated values inherit from this object.
	var proto = enumeration.prototype = {
		constructor: enumeration, // Identify type
		toString: function() { return this.name; }, // Return name
		valueOf: function() { return this.value; }, // Return valuetoJSON: function() { return this.name; } // For serialization
	};
	enumeration.values = []; // An array of the enumerated value objects
	
	// Now create the instances of this new type.
	for(name in namesToValues) { // For each value
		var e = inherit(proto); // Create an object to represent it
		e.name = name; // Give it a name
		e.value = namesToValues[name]; // And a value
		enumeration[name] = e; // Make it a property of constructor
		enumeration.values.push(e); // And store in the values array
	}
	
	// A class method for iterating the instances of the class
	enumeration.foreach = function(f,c) {
		for(var i = 0; i < this.values.length; i++) 
			f.call(c,this.values[i]);
	};
	
	// Return the constructor that identifies the new type
	return enumeration;
}


//inherit() returns a newly created object that inherits properties from the
//prototype object p. It uses the ECMAScript 5 function Object.create() if
//it is defined, and otherwise falls back to an older technique.
function inherit(p) {
	if (p == null) throw TypeError(); // p must be a non-null object
	if (Object.create) // If Object.create() is defined...
		return Object.create(p); // then just use it.
	var t = typeof p; // Otherwise do some more type checking
	
	if (t !== "object" && t !== "function") throw TypeError();
	
	function f() {}; // Define a dummy constructor function.
	
	f.prototype = p; // Set its prototype property to p.
	
	return new f(); // Use f() to create an "heir" of p.
}