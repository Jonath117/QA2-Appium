describe('Temporizador en Android', () => {
  
  it('Abrir la pestaña de Temporizador', async () => {
    // Ir a la pestaña Timer (Temporizador)
    const timerTab = await $('~Timer');
    await timerTab.click();
    await expect(timerTab).toBeDisplayed();
  });

  it('Configurar temporizador de 3 minuto y validar que arranca', async () => {
    const timerTab = await $('~Timer');
    await timerTab.click();

    const minutes = await $('android=new UiSelector().text("3")');
    await minutes.click();

    const seconds = await $('android=new UiSelector().text("00")');
    await seconds.click();

    // Iniciar el temporizador
    const startButton = await $('~Start'); 
    await startButton.click();

    // Validar que el temporizador está corriendo    
    const pauseButton = await $('~Pause');
    await pauseButton.waitForDisplayed({ timeout: 5000 });

    //pausar 
    await pauseButton.click();

    // Validar que aparece el botón para continuar que en este caso es "Start"
    const resumeButton = await $('~Start');
    await resumeButton.waitForDisplayed({ timeout: 5000 });
    await expect(resumeButton).toBeDisplayed();

  });

});
