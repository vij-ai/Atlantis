useEffect(() => {
  const unsubscribe = ref.onSnapshot((querySnapshot) => {
    const list = querySnapshot.docs.map((documentSnapshot) => {
      return {
        id: documentSnapshot.id,

        ...documentSnapshot.data(),
      };
    });

    setData(list);

    if (loading) {
      setLoading(false);
    }
  });

  /**
   * unsubscribe listener
   */
  return () => unsubscribe();
}, []);

useEffect(() => {
  const unsubscribe = ref.onSnapshot((querySnapshot) => {
    const list = [];
    querySnapshot.forEach((doc) => {
      console.log("##doc", doc);
      const { ChatRoomName } = doc.data();
      list.push({
        id: doc.id,

        ChatRoomName,
      });
    });

    //console.log("##list", list);

    setData(list);
    if (loading) {
      setLoading(false);
    }
  });
  return () => unsubscribe();
}, []);
