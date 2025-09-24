describe('App de Reloj en Android (Pixel 9)', () => {
  
  it('Abrir la app y validar que cargue la pestaña Alarm', async () => {
    const alarmTab = await $('~Alarm');
    await expect(alarmTab).toBeDisplayed();
  });

  it('Crear una nueva alarma a las 7:30', async () => {
    const alarmTab = await $('~Alarm');
    await alarmTab.click();

    const addButton = await $('~Add alarm');
    await addButton.click();

    const hour = await $('android=new UiSelector().text("7")');
    const minute = await $('android=new UiSelector().text("30")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();

    const newAlarm = await $('android=new UiSelector().textContains("7:30")');
    await expect(newAlarm).toBeDisplayed();
  });

  it('Editar la alarma creada y cambiarla a las 8:00', async () => {
    const alarmItem = await $('android=new UiSelector().textContains("7:30")');
    await alarmItem.click();

    const hour = await $('android=new UiSelector().text("8")');
    const minute = await $('android=new UiSelector().text("00")');
    await hour.click();
    await minute.click();

    const okBtn = await $('id=com.google.android.deskclock:id/material_timepicker_ok_button');
    await okBtn.click();

    const updatedAlarm = await $('android=new UiSelector().textContains("8:00")');
    await expect(updatedAlarm).toBeDisplayed();
  });

  it('Desactivar la alarma existente', async () => {
    const toggle = await $('id=com.google.android.deskclock:id/onoff');
    await toggle.click();

    // Validar que el switch esté apagado
    const isChecked = await toggle.getAttribute('checked');
    await expect(isChecked).toBe('false');
  });

it('Eliminar la alarma creada', async () => {
  const alarmItem = await $('android=new UiSelector().textContains("8:00")');
  await expect(alarmItem).toBeDisplayed();

  const deleteBtn = await $('id=com.google.android.deskclock:id/delete');
  await deleteBtn.click();

  // Validar que la alarma ya no existe
  const deletedAlarm = await $('android=new UiSelector().textContains("8:00")');
  const exists = await deletedAlarm.isExisting();
  await expect(exists).toBe(false);
});

});
