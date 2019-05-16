declare name 		"Alvin Lucier - Im sitting in a room (1969)";
declare version 	"1.0";
declare author 		"Giuseppe Silvi";
declare options "[midi:on]";

//-------------------------------------------------
// Alvin Lucier - I'm sitting in a room
//-------------------------------------------------

import("stdfaust.lib");

hmeter(x)	= attach(x, envelop(x) : hbargraph("[2][unit:dB]", -70, +5));
envelop = abs : max ~ -(1.0/ma.SR) : max(ba.db2linear(-70)) : ba.linear2db;

gain = hslider("[1] [midi:ctrl 1]", 0, -96, +6, 0.1) : ba.db2linear : si.smoo;

maxdel = ma.SR *(180);

B = checkbox("[1] Incipit");
I = int(B);
R = (I-I') <= 0; // Clear
D = (+(I):*(R))~_; // Caompuite the delay time during Incipit

L = checkbox("[2] I'm Sitting...");	//
IL = int(L);				// convert button signal from float to integer

process = vgroup("[2] Input", hmeter) :
          vgroup("[1]", *(IL) : de.delay(maxdel, D-1)) :
          vgroup("[3] Output", *(gain) : hmeter);
