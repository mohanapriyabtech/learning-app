"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _responseHandler = require("../../../../../utils/response-handler");
var ClearCollectionController = /*#__PURE__*/function () {
  function ClearCollectionController() {
    (0, _classCallCheck2.default)(this, ClearCollectionController);
  }

  /**
   * @description   api to clear collection
   * @param {*} req http://localhost:3000/api/v1/admin/clear/
   * @param {*} res 
   */
  (0, _createClass2.default)(ClearCollectionController, [{
    key: "delete",
    value: function _delete(req, res) {
      try {
        return _responseHandler.responseHandler.errorResponse(res, {}, 'api not in use', 400);
        // User.deleteMany({name:'mona'}).exec((err, result) => {
        //     if (err) return responseHandler.errorResponse(res, err);
        //     if (result) {
        //         return responseHandler.successResponse(res, result, 'collection deleted successfully');
        //     } else {
        //         return responseHandler.errorResponse(res, {}, "collection details not found", 400);
        //     }
        // })
      } catch (err) {
        return _responseHandler.responseHandler.errorResponse(res, err);
      }
    }
  }]);
  return ClearCollectionController;
}();
var _default = exports.default = new ClearCollectionController();
//# sourceMappingURL=clear-collection.js.map