class ObjectUtil {
  static unpackNestedField(object, nestedFieldName) {
    return Object.fromEntries(
      Object.entries(object)
        .map(([key, nestedObject]) => [key, nestedObject[nestedFieldName]])
    )
  }

}

export default ObjectUtil
