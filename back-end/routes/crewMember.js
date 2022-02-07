const express = require("express");
const router = express.Router();
const crewMemberController = require("../controllers/crewMember");

router.post('/crewMember',crewMemberController.addCrewMember);
router.get('/crewMember',crewMemberController.getAllCrewMembers);
router.get('/crewMember/:id',crewMemberController.getCrewMembers);
router.put('/crewMember/:id',crewMemberController.updateCrewMember);
router.delete('/crewMember/:id',crewMemberController.deleteCrewMember);

module.exports = router;

